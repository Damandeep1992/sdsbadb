import React, {useEffect, useState} from 'react';
import { IDataList } from '../model/IDataList';
import { getDataFromServer } from '../services/main';
import ExpenseTracker from './ExpenseTracker';


function ShowList(){
    const [showform, setShowform] = useState(false);
    const [items, setItems] = useState<IDataList[]>([]);
    const[sum, setSum] = useState<number>(0);
    const[error, setError] = useState<Error | null>(null);
    const[damanspent, setDamanspent] = useState<number>(0);
    const[naveenspent, setNaveenspent] = useState<number>(0);

    let damanspent1:number = 0;
    let naveenspent1:number = 0;

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result,value) => (result=result + value.price), 0));
                Shares(data);

            } catch(error:any){
                setError(error)
            }
        }
        fetchData()
    },[showform]);

    const Shares = (data: IDataList[]) => {
        data.map(share => 
            share.payeeName === "Daman" ? (damanspent1 = damanspent1 + share.price) : (naveenspent1 = naveenspent1 + share.price)
            )
            setDamanspent(damanspent1);
            setNaveenspent(naveenspent1);
    }

    const success = () => {
        setShowform(false)
    }

    const cancel = () => {
        setShowform(false)
    }

    return(
        <>
           <header id="page-Header">
               Expense Tracker
           </header>

           <button id="add-Button" onClick={()=>setShowform(true)}>Add</button>

           {
               showform && (
                   <ExpenseTracker onTrue={success} onClose={cancel}/>
               )
           }
           <>
            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{width:112}}>Payee</div>
           </>

           {
               items && 
               items.map((user, idx)=>(
                   <div key={idx}>
                       <div className="use-inline date">{user.setDate}</div>
                       <div className="use-inline">{user.product}</div>
                       <div className="use-inline price">{user.price}</div>
                       <div className="use-inline">{user.payeeName}</div>
                   </div>
               ))
           }
           <hr />
           <div className="use-inline">Total:</div>
           <span className="use-inline total">{sum}</span><br />

           <div className="use-inline">Daman paid:</div>
           <span className="use-inline total Daman">{damanspent}</span><br />

           <div className="use-inline">Naveen paid:</div>
           <span className="use-inline total Naveen">{naveenspent}</span><br />

           <span className="use-inline payable">
               {damanspent > naveenspent ? "Pay Daman" : "Pay Naveen"}
           </span>

           <span className="use-inline payable price">
               {""}
               {Math.abs(damanspent - naveenspent)/2}
           </span>

           {error && <>{error?.message}</>}
        </>
    );
}

export default ShowList;