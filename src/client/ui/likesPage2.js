import React from 'react';
import store from 'store';
import { getTagSearch, getLikes } from 'api/data';
import Item from 'ui/item';
import StarRating from 'ui/starRating';
import SearchInput from 'ui/searchInput';
import LikeBoxItem from 'ui/likeBoxItem';
import SaveSearch from 'ui/saveSearch';
import { Link } from 'react-router';

require('assets/styles/likesPage2.scss');
var image = require("assets/images/darkerLogo.png");
require('font-awesome-webpack');



export default React.createClass({
	getInitialState: function(){
		return {
			showSearch: false,
			showLikesSearch: false,
			showMoreButton: false,
			itemCount: 0,
			tagSearch: [],
			likes: [],
			fruit:['apple','banana','cherry','citrus','fruity', 'lemon', 'orange', 'pear', 'raisins', 'zest' ],
			structure: ['balanced', 'complex', 'dry', 'earthy', 'heavy', 'light', 'lingering', 'mellow', 'mild', 'old', 'smooth'],
			food: ['barley', 'buttery', 'butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'corn', 'honey', 'tea', 'toffee'],
			items: ['clove', 'coffee', 'floral', 'licorice', 'malty', 'mint', 'nutmeg', 'peaty', 'peppery', 'roses', 'spices', 'sugar', 'tobacco', 'vanilla', 'wood', 'sherry'],
			general: ['bitter', 'brine', 'creamy', 'ginger', 'herbal', 'maple', 'nutty', 'oak', 'rich', 'salty', 'smokey', 'sour', 'spicy', 'sweet'],
			appearance: ['amber', 'brown', 'green', 'caramel', 'pale'],
			price: ['$', '$$', '$$$'],
			proof: ['A little', 'A lot', 'Way too much'],
			likedwhiskey: []
		}
	},
	// componentWillmount: function(){
	// 	this.unsubscribe = store.subscribe(function(){
	// 		var currentStore = store.getState();
	// 		this.setState({
	// 			showSearch: currentStore.showReducer.showSearch
	// 		})
	// 	})
	// },
	toggleStatus: function(item,index, e){
		var val = item;
		var allLikes = this.state.likes;
		
		if(allLikes.indexOf(item)===-1){
			allLikes.push(item);
		} else {
			var arrIndex = allLikes.indexOf(item);
			allLikes.splice(arrIndex,1)
		}
		console.log(allLikes);
		getTagSearch(allLikes);

		store.dispatch({
			type: 'GET_LIKETAGS',
			likes: allLikes
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: true
		})
		getLikes();	
		
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				likes: currentStore.whiskeyReducer.likes,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey
			})
		}.bind(this))
	},
	// componentWillUnmount: function(){
	// 	this.unsubscribe;
	// },
	render: function(){
		return (
			<div className="bgImage">
				<header className="carryLogo">
					<div className="logoDiv">
						<Link to="/landingPage3"><img src={image} /></Link>
					</div>
					<div className="headerLinks">
						<Link to="/userPage2">Profile</Link>
						<Link to="/landingPage3">Logout</Link>
					</div>
				</header>
			<div className="barrelBg">
			<div className="container">
				
				<div className="navheader">
					<div className="whatYouLike">Now, tell us what you like...</div>
					<div className="searchHeader">
						<SearchInput />
					</div>

				</div>

				<div className="pickStuff"></div>
				<div className="bigFlex">
				<div className="formContainer">
				<form className="categories" id="categories" action="" method="post" onSubmit={this.handleSubmit}>
				<div className="barrelBarFlex">
				
					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Fruit</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.fruit.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Character</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.food.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Proof</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.proof.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Structure</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.structure.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Quality</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.items.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">General</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.general.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Appearance</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.appearance.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Price</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.price.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>
				</div>
				

				</form>
				</div>
				
					
					<LikeBoxItem likedwhiskey={this.state.likedwhiskey} tagSearch={this.state.tagSearch} showMoreButton={this.state.showMoreButton} likes={this.state.likes} itemCount={this.state.itemCount} />

				
				{/* {this.state.showLikesSearch ? <Item tagSearch={this.state.tagSearch} showLikesSearch={this.state.showLikesSearch} likes={this.state.likes}/> : ""} */}
			
					
				</div>	
			</div>
			</div>
			</div>
		)
	}
})