import Backbone from 'backbone'
import React from 'react'
import ReactDOM from 'react-dom'
import Underscore from 'underscore'
import ACTIONS from './actions.js'
import init from './init'
import {User, LinkModel, LinkCollection} from './models/models'
//import googleTrends from './google-trends-api'
//console.log(googleTrends)
// #

const app = function() {

	Array.prototype.show=function(){console.log(this)}
	String.prototype.show=function(){console.log(this)}


	
	

	const Header = React.createClass({
		render: () => {
			return <div id='header'>
				<h1>Attention Sphere</h1>
				<SearchBox/>
			</div>
		}

	})
	const SearchBox = React.createClass({
		_handleSearch: function(e){
			e.preventDefault()
			var query=e.currentTarget.sub.value+':'+e.currentTarget.tab.value
					location.hash='search/'+query

		},
		render: function(){
			return (
				<div className='searchbox'>
				<form id='searchform' onSubmit ={this._handleSearch}>
					&nbsp;<i>/r/</i><input placeholder='subreddit' type='text' name='sub'></input><br/><br/>
					<input type='text' placeholder='list' name='tab'/><br/>
					<input id='submitButton'type="submit" value="Submit"/>	
				</form>
				</div>
				   )
		}
	})
	const PostModels = React.createClass({


		render: function(){
			
			return(
				<div className='models'>
				<ListWrapper collection = {this.props.collection}/>
				</div>

				)
		}
	})
	const ListWrapper = React.createClass({

		_getJsxArray: function(listingArr){
			 
			var jsxArr = []
			listingArr.forEach(function(listing){

				
				jsxArr.push(<Listing key={listing.attributes.data.id} listingModel={listing} />)
			})
			return jsxArr
		},

		render: function(){
			// console.log('here comes this in ListWrapper render', this)
			return (
				<div id="list-wrapper">
					{this._getJsxArray(this.props.collection.models)}
				</div>
			)
		}
	})
	var Listing = React.createClass({
		
		render: function(){
			
			// console.log('this in listing component>>> ',this.props.listingModel)
		var item = this.props.listingModel.attributes.data
		var img = <div className='listingImg'><a href={item.url} target="_blank" ><img src={item.thumbnail}/></a></div>
		if(item.thumbnail.indexOf('http')!=0){img = null}
		return (
				<div className="listing"> 
					 
					
					
					{img}
						<div className='listingText'>
							<a href={item.url} target="_blank" >
				 			<div href={item.url} className="title">{item.title}</div>
							<div className="subreddit">{item.subreddit}</div>
							</a>
						</div>
					
				</div>
			)
		}
	})

	
	var SphereRouter = Backbone.Router.extend({
	routes:{
		'home': 'showHomePage',
		'search/:query': 'showSearchResults',
		'testroute':'test',
		'*catchall': 'redirectToHome'
	},
	showHomePage: function(){
		// var coll = new SubredditCollection()
  //     coll.fetch().then(function(){
  //       console.log(coll)
  //     })
        
		console.log('hi')

		ReactDOM.render(<Header/>,document.querySelector('.container'))

		var activeCollections = new LinkCollection()
		activeCollections.url += '/r/all/top.json?limit=10'
		activeCollections.fetch().then(function(){
			'fetched'.show()
			console.log(activeCollections.models)
			//console.log(ACTIONS._filterSub(activeCollections.models,'subreddit','funny'))
			ReactDOM.render(<PostModels collection = {activeCollections}/>,document.querySelector('.listing'))
		},function(resp,err){
			console.log('resp',resp)
			console.log('err',err)
		})
		

	},
	showSearchResults: function(subtab){
		var resArray =subtab.split(':')
		ReactDOM.render(<Header/>,document.querySelector('.container'))
		var activeCollections = new LinkCollection()
		if(!resArray[1]){activeCollections.url += '/r/'+resArray[0]+'.json'}
			else{activeCollections.url += '/r/'+resArray[0]+'/'+resArray[1]+'.json'}
		
		activeCollections.fetch().then(function(){
			'fetched'.show()
			console.log(activeCollections.models)
			//console.log(ACTIONS._filterSub(activeCollections.models,'subreddit','funny'))
			ReactDOM.render(<PostModels collection = {activeCollections}/>,document.querySelector('.listing'))
		},function(resp,err){
			console.log('resp',resp)
			console.log('err',err)
		})
	},
	test: function(){

	},
	redirectToHome: function(){
		location.hash = "home"
	},

	initialize: function(){
		Backbone.history.start()
	}



	})
	new SphereRouter()
}
export const app_name = init()
app()