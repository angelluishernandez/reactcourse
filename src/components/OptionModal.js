import React from "react";
import Modal from "react-modal";

const OptionModal = props => (
	<Modal
		isOpen={!!props.selectedOption}
		contentLabel="Selected Option"
		ariaHideApp={false}
		onRequestClose={props.handleModalClose}
	>
		<h3>This is the selected option</h3>
		{props.selectedOption && <p>{props.selectedOption}</p>}
		<button onClick={() => props.handleModalClose()}>Ok</button>
	</Modal>
);
export default OptionModal;
