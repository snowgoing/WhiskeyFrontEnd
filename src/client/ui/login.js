import React from 'react';
import store from 'store';
import { login } from 'api/data';
import { browserHistory } from 'react-router';

require('assets/styles/login.scss');

export default React.createClass({
	// componentWillMount: function () {
	// 	store.dispatch({
	// 		type:'NAVIGATE',
	// 		appClassName: 'login'
	// 	})
		
	// },
	getInitialState: function(){
		return {
			username: "",
			password: "",
			error: false
		}
	},
	handleChange: function(e){
		var val = e.target.value;
		if (e.target.type === 'text') {
			this.setState({
				username: e.target.value,
				password: this.state.password
			})
		} else {
			this.setState({
				username: this.state.username,
				password: e.target.value
			})
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		login(this.state.username, this.state.password).then(function(resp){
			console.log('handle then');
			
			browserHistory.push('/userPage');
		}.bind(this)).catch(function(err){
			console.log('handle catch');
			this.setState({
				error: true,
				username: "",
				password: ""
			});
		}.bind(this));

	},
	render: function(){
		return (
			<div className="loginBox">
				<form action="" method="post" onSubmit={this.handleSubmit} id="loginForm">
		      		<input type="text" onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username"/><br />
		      		<input type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password"/> 
		      		<button className="loginButton">Login</button>
		      		{this.state.error ? <div className='error'>Password and Username do not match</div> : ''}
	  			</form>
  			</div>
		)
	}
})