import "./Blog.css"; // Create a separate CSS file for Post-specific styles

function BlogCard({ title, description, image }) {
    return (
        <article className="post">
            <img className="post-image" src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </article>
    );
}

export default BlogCard;