export default function LoadingSpinner() {

    return (
        <div className="container d-flex justify-content-around mt-1">
            <div class="spinner-border text-primary spinner-size" role="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

    );
}