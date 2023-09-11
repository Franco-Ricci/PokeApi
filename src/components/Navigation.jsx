/* eslint-disable react/prop-types */

import { Loader } from "./Loader";

// eslint-disable-next-line react/prop-types
export function Navigation({pagine, setPagine}){
  if (!pagine) {

    return <Loader />;
  }
    return (
        
            <div className="pagination__container">
            <button
              className="pagination__btn"
              onClick={() => {
                if (pagine !== null) {
                  setPagine(pagine.previous);
                }
              }}

              disabled={pagine.previous === null}
            >
              Prev
            </button>
            <button
              className="pagination__btn"
              onClick={() => {
                if (pagine !== null) {
                  setPagine(pagine.next);
                }
              }}
              disabled={pagine.next === null}
            >
              Next
            </button>
          </div>
        
    )
}