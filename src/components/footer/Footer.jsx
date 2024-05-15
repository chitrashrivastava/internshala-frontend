import { Link } from "react-router-dom"
const Footer=()=>{
    return <>
    <div className="footer h-[70vh] w-full flex flex-col items-center justify-evenly bg-zinc-800 text-white">
        <div className="flex justify-evenly w-[80%]">
            <div className="flex flex-col">
                <h1 className="font-bold">Internships By places</h1>
                <Link to='/internships'>Internship in India</Link>
                <Link to='/internships'>Internship in Delhi</Link>
                <Link to='/internships'>Internship in bangalore</Link>
                <Link to='/internships'>Internship in Hyderabad</Link>
                <Link to='/internships'>Internship in Mumbai</Link>
                <Link to='/internships'>Internship in Chennai</Link>
                <Link to='/internships'>Internship in Kolkata</Link>
                <Link to='/internships'>Virtual Internships</Link>
                <Link to='/internships'>View all Internships</Link>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold">Internships By Stream</h1>
                <Link to='/internships'>Computer Science Internships</Link>
                <Link to='/internships'>Electronics Internships</Link>
                <Link to='/internships'>Medical Internships</Link>
                <Link to='/internships'>Civil Internships</Link>
                <Link to='/internships'>Marketing Internships</Link>
                <Link to='/internships'>Chemical Internships</Link>
                <Link to='/internships'>Finance Internships</Link>
                <Link to='/internships'>Summer Research Fellowship</Link>
                <Link to='/internships'>View all Internships</Link>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold">Jobs By places</h1>
                <Link to='/Jobs'>Jobs in India</Link>
                <Link to='/Jobs'>Jobs in Delhi</Link>
                <Link to='/Jobs'>Jobs in bangalore</Link>
                <Link to='/Jobs'>Jobs in Hyderabad</Link>
                <Link to='/Jobs'>Jobs in Mumbai</Link>
                <Link to='/Jobs'>Jobs in Chennai</Link>
                <Link to='/Jobs'>Jobs in Kolkata</Link>
                <Link to='/Jobs'>Virtual Jobs</Link>
                <Link to='/Jobs'>View all Jobs</Link>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold">Jobs By places</h1>
                <Link to='/Jobs'>Computer Science Jobs</Link>
                <Link to='/Jobs'>Marketing Jobs</Link>
                <Link to='/Jobs'>Web Dev Jobs</Link>
                <Link to='/Jobs'>Sales Jobs</Link>
                <Link to='/Jobs'>Finance Jobs</Link>
                <Link to='/Jobs'>Graphic Designing Jobs</Link>
                <Link to='/Jobs'>Digital Marketing Jobs</Link>
                <Link to='/Jobs'>Data Science Jobs</Link>
                <Link to='/Jobs'>View all Jobs</Link>
            </div>
        </div>
        <div className="w-[80%] h-[1px] bg-gray-200"></div>
        <div className="flex justify-evenly w-full">
            <div className="flex flex-col">
                <h1>About Us</h1>
                <Link>We're hiring</Link>
                <Link>Hire interns for your company</Link>
            </div>
            <div className="flex flex-col">
                <h1>Team Diary</h1>
                <Link>Blog</Link>
                <Link>Our Services</Link>
            </div>
            <div className="flex flex-col">
                <h1>Terms and Conditions</h1>
                <Link> Privacy</Link>
                <Link>Contact Us</Link>
            </div>
            <div className="flex flex-col">
                <h1>Sitemap</h1>
                <Link>College TPO registration</Link>
                <Link>List of Companies</Link>
            </div>
        </div>

    </div>
    </>
}
export default Footer