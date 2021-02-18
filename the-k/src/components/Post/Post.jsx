import './Post.scss';

const Post = () => {

    return (
        <div className='Post'>
			<p>nouveau message</p>
	        <form onSubmit={handleSubmit(createPost)} className="Post__form">
	          <input name="user" type="hidden" value={id} ref={register({ required: true })} />
	          <input name="text" type="text" placeholder="nouveau message" ref={register({ required: true })} />
	          <input type="submit" />
	          <p>{displayError}</p>
	        </form>
        </div>
    );
};

export default Post;