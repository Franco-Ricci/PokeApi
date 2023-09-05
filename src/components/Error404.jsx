export function Error404(){
    return (
        <div className="errorPage__container">
            <p className="errorPage__Text">Error</p>
            <img src="../public\poke404error.jpg" alt="404 page not found" />
            <button className="errorPage__btn" onClick={() =>  window.location.reload()}>Reload</button>
        </div>
    )
}