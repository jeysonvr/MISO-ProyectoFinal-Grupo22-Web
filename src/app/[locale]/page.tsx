import { useTranslations } from 'next-intl';
import Link from "next/link";

export default function Home() {

  const labels = useTranslations('home');
  const homeLabels = {
    label_oportunities: labels('label_oportunities'),
    label_for_you: labels('label_for_you'),
    cta_login: labels('cta_login'),
    span_or: labels('span_or'),
    cta_signup: labels('cta_signup'),
    label_phrase_1: labels('label_phrase_1'),
    label_phrase_2: labels('label_phrase_2')
  };

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center items-center h-70vh bg-b6e5e1 text-center" style={{height: '70vh', background:"#b6e5e1", textAlign: 'center'}}> 
            <div className="pb-5 pt-5 ">
                <span className="text-center text-2xl font-bold" style={{color: '#0DA89B'}}>{homeLabels.label_oportunities}</span> 
                <span className="text-center text-2xl font-bold text-black">{homeLabels.label_for_you}</span>
            </div>   
            <div>
                <Link href="login" className="ml-2 text-teal-500 font-semibold">
                <button className="px-4 mx-auto h-8" id='loginBtn' type="submit" 
                        style={{
                            backgroundColor: '#0DA89B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}>
                        {homeLabels.cta_login} 
                </button>
                </Link>   
                <span className="text-center ml-2">{homeLabels.span_or}</span> 
                <Link href="signup" className="ml-2 text-teal-500 font-semibold">
                <button className="px-4 mx-auto h-8" id='signupBtn' type="submit" 
                        style={{
                            backgroundColor: '#0DA89B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}>
                        {homeLabels.cta_signup}
                </button>
                </Link>  
            </div>           
            <div className="pb-5 pt-5 ">
                <span className="text-center text-black">{homeLabels.label_phrase_1}</span> 
                <br></br>
                <span className="text-center text-black">{homeLabels.label_phrase_2}</span>
            </div>           
        </div>
    );
}
