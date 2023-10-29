import Link from "next/link";

import '../../globals.css';


const InitForm = ({ labels }: any) => {

    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center h-70vh bg-b6e5e1 text-center" style={{height: '70vh', background:"#b6e5e1", textAlign: 'center'}}> 
            <div className="pb-5 pt-5 ">
                <span className="text-center text-2xl font-bold" style={{color: '#0DA89B'}}>{labels.label_oportunities}</span> 
                <span className="text-center text-2xl font-bold text-black">{labels.label_for_you}</span>
            </div>   
            <div>
                <Link href="login" className="ml-2 text-teal-500 font-semibold">
                <button className="mx-4 px-4 mx-auto h-8" id='loginBtn' type="submit" 
                        style={{
                            backgroundColor: '#0DA89B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}>
                        {labels.cta_login} 
                </button>
                </Link>   
                <span className="text-center ml-2">{labels.span_or}</span> 
                <Link href="signup" className="ml-2 text-teal-500 font-semibold">
                <button className="mx-4 px-4 mx-auto h-8" id='signupBtn' type="submit" 
                        style={{
                            backgroundColor: '#0DA89B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}>
                        {labels.cta_signup}
                </button>
                </Link>  
            </div>           
            <div className="pb-5 pt-5 ">
                <span className="text-center text-black">{labels.label_phrase_1}</span> 
                <br></br>
                <span className="text-center text-black">{labels.label_phrase_2}</span>
            </div>           
        </div>
    );
}

export default InitForm;