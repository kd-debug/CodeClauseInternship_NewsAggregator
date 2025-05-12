const router = require('express').Router();
const axios = require('axios');
const News = require('../models/News');
const auth = require('../middleware/auth');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'real-time-news-data.p.rapidapi.com';

function normalizeSource(source) {
    return typeof source === 'string' ? source : (source?.name || '');
}

function formatArticle(article, category) {
    return {
        title: article.title,
        description: article.description,
        url: article.link,
        urlToImage: article.image_url,
        source: normalizeSource(article.source),
        category,
        publishedAt: article.published_date || article.pubDate || ''
    };
}

// GET news articles based on user preferences
router.get('/articles', auth, async (req, res) => {
    try {
        const userNews = await News.findOne({ user: req.user.id });
        const categories = userNews?.preferences?.categories?.length > 0
            ? userNews.preferences.categories
            : ['general'];

        const articles = await Promise.all(
            categories.map(async (category) => {
                try {
                    const response = await axios.get(
                        'https://real-time-news-data.p.rapidapi.com/topic-news-by-section',
                        {
                            params: {
                                topic: category.toUpperCase(),
                                country: 'US',
                                lang: 'en',
                                limit: 20
                            },
                            headers: {
                                'x-rapidapi-key': RAPIDAPI_KEY,
                                'x-rapidapi-host': RAPIDAPI_HOST
                            }
                        }
                    );

                    return (response.data?.data || []).map(a => formatArticle(a, category));
                } catch (err) {
                    console.error(`Error fetching category ${category}:`, err.message);
                    return [];
                }
            })
        );

        const flattened = articles.flat();
        if (flattened.length === 0) {
            return res.status(404).json({ message: 'No articles found for selected categories' });
        }

        res.json(flattened);
    } catch (err) {
        console.error('Error in /articles:', err);
        res.status(500).json({ message: 'Error fetching articles', error: err.message });
    }
});

// POST save article
router.post('/save', auth, async (req, res) => {
    try {
        const { title, description, url, urlToImage, source, category, publishedAt } = req.body;

        let userNews = await News.findOne({ user: req.user.id });
        if (!userNews) {
            userNews = new News({
                user: req.user.id,
                preferences: { categories: ['general'] },
                savedArticles: []
            });
        }

        // Check if already saved
        const exists = userNews.savedArticles.some(a => a.url === url);
        if (exists) return res.status(400).json({ message: 'Article already saved' });

        userNews.savedArticles.push({
            title,
            description,
            url,
            imageUrl: urlToImage,
            source,
            category,
            publishedAt: new Date(publishedAt)
        });

        await userNews.save();
        res.json(userNews.savedArticles);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PUT update user preferences
router.put('/preferences', auth, async (req, res) => {
    try {
        const { categories, sources } = req.body;

        let userNews = await News.findOne({ user: req.user.id });
        if (!userNews) {
            userNews = new News({
                user: req.user.id,
                preferences: { categories, sources },
                savedArticles: []
            });
        } else {
            userNews.preferences = { categories, sources };
        }

        await userNews.save();
        res.json(userNews.preferences);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET saved articles
router.get('/saved', auth, async (req, res) => {
    try {
        const userNews = await News.findOne({ user: req.user.id });
        const mapped = (userNews?.savedArticles || []).map(article => ({
            ...article._doc,
            urlToImage: article.imageUrl,
            source: normalizeSource(article.source),
            publishedAt: article.publishedAt?.toISOString() || ''
        }));

        res.json(mapped);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// DELETE saved article
router.delete('/saved', auth, async (req, res) => {
    try {
        const url = req.query.url || req.body.url;
        const userNews = await News.findOne({ user: req.user.id });

        if (!userNews) {
            return res.status(404).json({ message: 'User not found' });
        }

        const initialCount = userNews.savedArticles.length;
        userNews.savedArticles = userNews.savedArticles.filter(article => article.url !== url);

        if (userNews.savedArticles.length === initialCount) {
            return res.status(404).json({ message: 'Article not found in saved list' });
        }

        await userNews.save();
        res.json(userNews.savedArticles);
    } catch (err) {
        console.error('Error in DELETE /saved:', err);
        res.status(500).send('Server Error');
    }
});

// GET /search?q=query
router.get('/search', auth, async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'No search query provided' });

        const response = await axios.get(
            'https://real-time-news-data.p.rapidapi.com/search',
            {
                params: {
                    query: q,
                    country: 'US',
                    lang: 'en',
                    limit: 20
                },
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );

        const results = (response.data?.data || []).map(a => formatArticle(a, 'search'));
        if (results.length === 0) return res.status(404).json({ message: 'No results found' });

        res.json(results);
    } catch (err) {
        console.error('Error in /search:', err);
        res.status(500).json({ message: 'Error searching news articles', error: err.message });
    }
});

module.exports = router;
