const Info = ({ infoName, info, onDetail }) => {
    return (
        <>
            <p className="fs-5">
                <span>
                    <span className="text-purple">{infoName}: </span>
                    <span>{info} </span>
                </span>
                <i className="bi-eye-fill ms-3 text-purple pointer" onClick={onDetail}></i>
            </p>
        </>
    );
};

export default Info;
