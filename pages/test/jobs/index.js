import JobList from '../../../components/JobList.js';
import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner.js';

//API header
const data = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: []

}

/**
 * This method is used for server side rendering props fetch
 * 
 */
export async function getServerSideProps(context) {
    //Fetching job list from api
    const res = await axios.post("https://www.zippia.com/api/jobs/", data);

    //Returning job list as props
    return {
        props: {
            jobList: res.data
        }
    }

}

export default function Jobs(props) {

    //Using state hook for saving state
    const [myJobs, setMyJobs] = useState(props.jobList.jobs);
    const [showLoading, updateLoading] = useState(false);
    //Currently I have not provided option to update number of jobs showing but it can be done easily
    const [jobLimit, setJobLimit] = useState(10);
    //Using state to store active filter
    const [pastSevenDaysFilterActive, setPastSevenDaysFilterActive] = useState(false);
    const [companyNameFilterActive, setCompanyNameFilterActive] = useState (false);

    /*
    * This method fetch past 7 days job
    */
    function getPastSevenDaysJob() {

        //Updating past seven days filter state
        setPastSevenDaysFilterActive(true);
        //showing loading screen
        updateLoading(true);

        //fetching jobs from API
        axios.post("https://www.zippia.com/api/jobs/", { postingDateRange: "7d", ...data }).then(res => {
            setMyJobs(res.data.jobs);
            updateLoading(false);
        });
    }

    /*
    * This method is used to clear applied filter
    */
    function clearAppliedFilter(){
        //Updating all filter state
        setPastSevenDaysFilterActive(false);
        setCompanyNameFilterActive(false);
        setMyJobs(props.jobList.jobs);
    }

    return (
        <div>
            <div className="container">
                <h1 className="page-heading">BUSINESS ANALYST JOBS NEAR ME</h1>
            </div>
            <hr />
            <div className="container">
                <button type="button" title="Past 7 days jobs" className={`btn ${pastSevenDaysFilterActive ? "btn-primary" : "btn-secondary"}`} onClick={getPastSevenDaysJob}>Past 7 days</button>
                <button type="button" title="Company name" className={`btn ml-1 ${companyNameFilterActive ? "btn-primary" : "btn-secondary"}`} >Company Name</button>
                <button type="button" title="Clear filter" className="btn btn-primary ml-1"  onClick={clearAppliedFilter}>Clear</button>
            </div>
            {
                //Showing loading if jobs are not fetched yet
                showLoading ? <LoadingSpinner /> : <JobList jobs={myJobs} jobLimit={jobLimit}/>
            }

        </div>
    )
}