import React from 'react';

export default function JobCard(props) {

    return (
        <div className="card rounded m-2 py-3 px-3 align-self-stretch flex-column">
            <div className="company-name h-10">
                {props.job.companyName}
            </div>
            <div className="job-title h-25">
                {props.job.jobTitle}
            </div>
            <div className="cut-text">
                <hr />
                <p className="short-desc">
                    {props.job.shortDesc}
                </p>
            </div>
        </div>
    )
}

