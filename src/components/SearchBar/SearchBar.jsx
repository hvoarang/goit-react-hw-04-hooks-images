import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
	Header,
	SearchForm,
	SearchFormButton,
	SearchFormInput,
	SearchIcon,
} from './SearchBar.styled';
export const SearchBar = ({ onSubmit }) => {
	const [pictureName, setPictureName] = useState('');
	const handleChange = e => {
		setPictureName(e.currentTarget.value.toLowerCase());
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (pictureName.trim() === '') {
			toast.error('Enter search query');
			return;
		}
		onSubmit(pictureName);
		setPictureName('');
	};

	return (
		<Header>
			<SearchForm onSubmit={handleSubmit}>
				<SearchFormInput
					type="text"
					name="pictureName"
					value={pictureName}
					onChange={handleChange}
				/>
				<SearchFormButton type="submit">
					<SearchIcon />
				</SearchFormButton>
			</SearchForm>
		</Header>
	);
};

SearchBar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
