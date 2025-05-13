import { useLoaderData } from "react-router";
import Card from "../components/Card";

const Home = () => {
    const data = useLoaderData()
    
    return (
        <div>
            {
                data && <div>

                    {
                        data.map((c) => <Card company={c}/>)
                    }
                </div>
            }
        </div>
    );
};

export default Home;