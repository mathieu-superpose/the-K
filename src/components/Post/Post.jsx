import './Post.scss';
import { useForm } from "react-hook-form";

const Post = ({ createPost, id, displayError }) => {
	const { register, handleSubmit, watch, errors } = useForm();

    return (
        <div className='Post'>
          <h2 className='Post__title'>Des messages de moins de 140 caractères</h2>
          <form onSubmit={handleSubmit(createPost)} className='Post__form'>
            <input name="user" type="hidden" value={id} ref={register({ required: true })} />
            <input className='Post__form__text' name="text" type="text" placeholder="nouveau message" ref={register({ required: true, maxLength: 140 })} />
            <input className='Post__form__button' type="submit" />
            <p className='Post__form__error'>{displayError}</p>
          </form>
        </div>
    );
};

export default Post;
