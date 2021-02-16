import './Form.scss';

const Form = () => {

    return (
        <form action="" method="get" className="Form">
		  <div className="Form__field">
		    <label for="name">Enter your name: </label>
		    <input type="text" name="name" id="name" required />
		  </div>
		  <div className="Form__field">
		    <label for="email">Enter your email: </label>
		    <input type="email" name="email" id="email" required />
		  </div>
		  <div className="Form__field">
		    <label for="email">Enter your password: </label>
		    <input type="password" name="password" id="password" required />
		  </div>
		  <div className="Form__field">
		    <input type="submit" value="Subscribe!" />
		  </div>
		</form>
    );
};

export default Form;