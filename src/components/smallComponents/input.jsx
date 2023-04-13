import React from 'react';
import styled from 'styled-components';

const Input = ({ className, placeholder, onChange = () => {}, onEnter = () => {}, value }) => {
  return (
    <InputWrapper className={className}>
      <input
        type='search'
        onChange={e => onChange(e)}
        onKeyDown={(e) => onEnter(e)}
        placeholder={placeholder}
        value={value}
      />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	min-width:220px;
	border-radius: 4px;
	border: solid 1px rgb(210, 210, 210);
	background-color: rgb(250, 250, 250);
	position: relative;
	overflow: hidden;
	input {
		width: 100%;
		background-color: transparent;
		display: inline-block;
		height: 100%;
		line-height: 40px;
		outline: none 0;
		padding: 0 30px 0 10px;
		border: none 0;
	}
`;
