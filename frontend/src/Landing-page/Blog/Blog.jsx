import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import "./Blog.css";
import BlogHeader from "./BlogHeader";
function Blog() {
    return (
        <>
            <BlogHeader />

            <div className="blogContainer">
                <div className="row justify-content-start">
                    <Link style={{ marginLeft: "1rem",fontSize:"20px", textDecoration:"none" }} to="/" className="mb-4">
                        ← Back to Home
                    </Link>
                </div>
                <div className="row blogRow">
                    <div className="col-lg-4 col-md-6 blogPost">
                        <Link style={{ textDecoration: "none", color: "black" }} to="/blog/first">
                            <BlogCard
                                title="The Future of Digital Banking"
                                description="Explore how AI, blockchain, and modern apps are reshaping how we save, spend, and invest."
                                image="TheFutureOfDigitalBanking.png"
                            />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 blogPost">
                        <Link style={{ textDecoration: "none", color: "black" }} to="/blog/second">
                            <BlogCard
                                title="Smart Ways to Manage Student Loans"
                                description="Learn practical strategies to repay loans faster while keeping your budget balanced."
                                image="SmartLoanManagementTips.png"
                            />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 blogPost">
                        <Link style={{ textDecoration: "none", color: "black" }} to="/blog/third">
                            <BlogCard
                                title="The Power of Investing Early"
                                description="Discover how early investing and compounding can grow your wealth over time."
                                image="ThePowerofInvestingEarly.png"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
