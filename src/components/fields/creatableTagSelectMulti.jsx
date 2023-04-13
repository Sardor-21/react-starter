import React, {useState} from 'react';
import {Input, notification, Popover, Spin} from "antd";
import {Fields} from "components";
import Actions from "modules/entity/actions";

import {Field} from "formik";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

const CreatableTagSelect = ({setFieldValue, values, i}) => {

  const [tagText, setTagText] = useState('');
  const [tagVisible, setTagVisible] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const createTag = (title) => {
    setTagLoading(true);
    dispatch(Actions.Form.request({
      method: 'post',
      entity: 'tag',
      name: 'create',
      url: `/admin/tags`,
      values: {
        status: 1,
        title: title
      },
      cb: {
        success: (data) => {
          notification["success"]({
            message: t("Успешно"),
            duration: 2
          });
          setFieldValue(`tags`, [...values.tags[i], data])
        },
        error: () => {
          notification["error"]({
            message: t("Что-то пошло не так"),
            duration: 2
          });
        },
        finally: () => {
          setTagLoading(false);
          setTagVisible(false);
          setTagText("");
        },
      }
    }))
  };

  const onEnter = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      createTag(event.target.value);
    }
  };

  const content = (
    <div>
      <Spin spinning={tagLoading}>
        <Input
          placeholder={t("Введите название")}
          type="text"
          size="large"
          value={tagText}
          onKeyDown={(e) => onEnter(e)}
          onChange={e => setTagText(e.target.value)}
        />
      </Spin>
    </div>
  );

  return (
    <div className="d-flex align-items-center mb-20">
      <Field
        component={Fields.AsyncSelect}
        name={`tags[${i}]`}
        placeholder={t("Выберите теги")}
        label={t("Тег")}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        loadOptionsUrl="/admin/tags"
        className="mb-0 flex-1"
        optionLabel={`title`}
        loadOptionsParams={search => {
          return {
            extra: {title: search}
          }
        }}
      />
      <Popover
        visible={tagVisible}
        onVisibleChange={e => setTagVisible(e)}
        content={content}
        title="Добавить тег"
        trigger="click"
        placement="topRight"
      >
        <div className="plus-btn mt-25 ml-10"/>
      </Popover>
    </div>
  );
};

export default CreatableTagSelect;
