import JobList from '../../../components/JobList.js';
import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner.js';


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
    //Data for post api

    let res = await axios.post("https://www.zippia.com/api/jobs/", data);

    //Returning job list as props
    return {
        props: {
            jobList: res.data
        }
    }

}

export default function Jobs(props) {

    //Storing jobs on server side render
    let { jobList } = props;

    //Using state hook for saving state
    const [showLoading, updateLoading] = useState(false);
    //Currently I have not provided option to update number of jobs showing but it can be done easily
    const [jobLimit, setJobLimit] = useState(10);

    /*
    * This method fetch past 7 days job
    */
    function getPastSevenDaysJob() {
        //showing loading screen
        updateLoading({
            showLoading: true
        });

        //fetching jobs from API
        axios.post("https://www.zippia.com/api/jobs/", { postingDateRange: "7d", ...data }).then(res => {
            jobList = res.data;
            updateLoading(false);
        });
    }

    /*
    * This method is used to clear applied filter
    */
    function clearAppliedFilter(){
        updateLoading({
            showLoading: true
        });
        axios.post("https://www.zippia.com/api/jobs/", data).then(res => {
            jobList = res.data;
            updateLoading(false);
        });
    }

    return (
        <div>
            <div className="container">
                <h1 className="page-heading">DEVELOPER JOBS NEAR ME</h1>
            </div>
            <hr />
            <div className="container">
                <button type="button" title="Past 7 days jobs" className="btn btn-primary" onClick={getPastSevenDaysJob}>Past 7 days</button>
                <button type="button" title="Company name" className="btn btn-primary ml-1" >Company Name</button>
                <button type="button" title="Clear filter" className="btn btn-primary ml-1"  onClick={clearAppliedFilter}>Clear</button>
            </div>
            {
                //Showing loading if jobs are not fetched yet
                showLoading ? <LoadingSpinner /> : <JobList jobs={jobList.jobs} jobLimit={jobLimit}/>
            }

        </div>
    )
}