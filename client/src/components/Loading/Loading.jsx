import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="loading-text gradient-text">waking up...</div>
            </div>
        </div>
    );
};

export default Loading;
