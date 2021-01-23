import JobCard from '../components/JobCard.js'

export default function JobList(props) {

    return (
        <div className="container">
            <div className="row">
                {
                    //Creating job card for first 10 job in job list
                    props.jobs.slice(0, props.jobLimit).map(job => (
                        //Used bootstrap responsive class to make job card responsive
                        <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12 p-0 mt-1 d-flex justify-content-around" key={job.jobId}>
                            <JobCard job={job} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}