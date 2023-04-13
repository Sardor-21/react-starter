import React, {useState} from 'react';

import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import cx from "classnames";
import {useDispatch} from "react-redux"

import {Spinner} from "components";
import filemanagerActions from "store/actions/filemanager";
import Dropzone from 'react-dropzone'
import DropzonePlaceholderIcon from "./icons/gallery.svg";
import "./style.scss";
import get from "lodash/get";
import {ReactComponent as DeleteIcon} from "./icons/delete.svg";

const DropzoneComponent = ({className, title, authorId, description, onSuccess, field, form: {touched, errors, setFieldValue, values}}) => {

  const [isFetched, setFetched] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const classNames = cx(
    'bb-dropzone',
    !isFetched ? "loading" : '',
    error ? 'has-error' : '',
    className,
  );

  const onChange = files => {
    setFetched(false);
    setError(false);

    let formData = new FormData();
    files.forEach(file => formData.append("files[]", file));
    if(authorId) formData.append("author_id", authorId);

    const cb = {
      success: (uploadedImages = []) => {
        onSuccess(uploadedImages);
        setFieldValue(field.name, [...uploadedImages, ...values[field.name]]);
      },
      failure: (e) => {
        setError(true)
      },
      finally: () => {
        setFetched(true);
      }
    };

    dispatch(filemanagerActions.UploadFile({
      files: formData,
      cb
    }))
  };

  const removeHandler = selected => {
    setFieldValue(field.name, values[field.name].filter(item => item.id !== selected.id))
  };

  return (
    <div>
      <Dropzone accept="image/*" onDrop={onChange} multiple={true}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} className={classNames}>
            <input {...getInputProps()} />
            <div className="bb-dropzone-content">
              <img src={DropzonePlaceholderIcon} alt="" className="bb-dropzone-icon"/>
              <div className="bb-dropzone-title">{t(title)}</div>
              <div className="bb-dropzone-description">{t(description)}</div>
              {error && (
                <div className="error-message">{t("Возникла ошибка при загрузке")}</div>
              )}
            </div>
            {!isFetched && (
              <Spinner position={"absolute"} md/>
            )}
          </div>
        )}
      </Dropzone>
      <div className="preview-list">
        {values[field.name].map((item, i) => (
          <div className="preview-item" key={get(item, 'id', `${i}`)}>
            <div className="delete-btn" onClick={() => removeHandler(item)}>
              <DeleteIcon height={22} width={22}/>
            </div>
            {get(item, 'thumbnails') ? (
              <img src={get(item, 'thumbnails.small.src')} alt=""/>
            ) : (
              <img src={get(item, 'link')} alt=""/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

DropzoneComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onSuccess: PropTypes.func,
};
DropzoneComponent.defaultProps = {
  className: '',
  title: 'Загрузить фотографию',
  description: 'Такие файлы как jpg, png, gif',
  onSuccess: () => {}
};

export default DropzoneComponent;

