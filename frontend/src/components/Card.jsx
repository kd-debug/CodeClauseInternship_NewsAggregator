import React from "react";

function Card(props) {

    let formattedDate = '';
    if (props.publishedAt) {
        const dateObj = new Date(props.publishedAt);
        formattedDate = dateObj.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    return (
        <div className="news-card">
            <b className="title">{props.title}</b>
            <div className="news-card-img mx-auto">
                <img className="news-card-img" src={props.imgUrl} alt="img" />
            </div>
            <div className="news-card-content">
                <div className="description-text">
                    {props.description?.substring(0, 400)}
                </div>
                <div className="info mt-2">
                    <div className="source-info flex items-center gap-2">
                        <span className="font-semibold">Source:</span>
                        <a
                            href={props.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link underline break-words"
                        >
                            {props.source?.substring(0, 70)}
                        </a>
                    </div>
                    <div className="origin flex">
                        <p className="origin-item">
                            <span className="font-semibold">Date:</span> {formattedDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
