// stateless functional component

import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.state = {
			options: [],
			selectedOption: undefined,
		};
	}

	// Component lifecycle

	componentDidMount() {
		try {
			const options = JSON.parse(localStorage.getItem("options"));
			if (options) {
				this.setState({
					options,
				});
			}
		} catch (e) {
			// Do nothing
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem("options", json);
		}
	}
	componentWillUnmount() {
		console.log("Component will unmount!");
	}

	// Class methods

	handleDeleteOptions() {
		this.setState({
			options: [],
		});
	}

	handleDeleteOption(optionToRemove) {
		this.setState(prevState => ({
			options: prevState.options.filter(option => optionToRemove !== option),
		}));
	}

	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		this.setState({
			selectedOption: option,
		});
	}
	handleAddOption(option) {
		if (!option) {
			return "Enter valid value to add item";
		} else if (this.state.options.indexOf(option) > -1) {
			return "This option already exists";
		}

		this.setState(prevState => ({
			options: prevState.options.concat(option),
		}));
	}

	// Handle modal close
	handleModalClose(event) {
		this.setState(() => ({
			selectedOption: undefined,
		}));
	}

	render() {
		const title = "Indecision";
		const subtitle = "Put your life in the hands of a computer";

		return (
			<div className="IndecisionApp">
				<Header title={title} subtitle={subtitle} />
				<div className="container container__body">
					<Action
						hasOptions={this.state.options.length >= 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">

					<Options
						options={this.state.options}
						handleDeleteOptions={this.handleDeleteOptions}
						handleDeleteOption={this.handleDeleteOption}
					/>
					<AddOption handleAddOption={this.handleAddOption} />
					</div>
				</div>
				<OptionModal
					selectedOption={this.state.selectedOption}
					handleModalClose={this.handleModalClose}
				/>
			</div>
		);
	}
}

export default IndecisionApp;
