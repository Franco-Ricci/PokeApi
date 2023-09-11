export function Error404(){
    return (
        // VM953:1 Uncaught (in promise) SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
        <div className="errorPage__container">
            <p className="errorPage__Text">Error</p>
            <img src="../poke404error.jpg" alt="404 page not found" />
            <button className="errorPage__btn" onClick={() =>  window.location.reload()}>Reload</button>
        </div>
    )
}