import React from 'react';
import AddAttributesModal from './index';

export default {
  title: 'Features/Segments/components/AddAttributesModal',
  component: AddAttributesModal,
};

export const Playground = (args) => <AddAttributesModal {...args} />;
Playground.args = {
  isTreeFetching: false,
  title: 'Выбрать значения',
  tree: [
    {
      group: 'Студенты',
      attributes: [
        { id: 11, attributeName: 'education_level' },
        { id: 46, attributeName: 'university_id' },
        { id: 79, attributeName: 'education_form' },
        { id: 185, attributeName: 'profile_present' },
        { id: 192, attributeName: 'category' },
      ],
    },
    {
      group: 'Пенсионеры',
      attributes: [
        { id: 171, attributeName: 'profile_present' },
      ],
    },
    {
      group: 'Любители домашних животных',
      attributes: [
        { id: 72, attributeName: 'profile_present' },
        { id: 197, attributeName: 'info' },
      ],
    },
    {
      group: 'Голосование / Выборы',
      attributes: [
        { id: 1, attributeName: 'profile_present' },
        { id: 35, attributeName: 'elec_2016' },
        { id: 49, attributeName: 'elec_2019' },
        { id: 51, attributeName: 'elec_2017' },
        { id: 75, attributeName: 'elec_2020_deg' },
        { id: 77, attributeName: 'elec_2018_m' },
        { id: 91, attributeName: 'elec_2018_p' },
        { id: 149, attributeName: 'elec_2013' },
        { id: 173, attributeName: 'elec_2014' },
      ],
    },
    {
      group: 'Льготники',
      attributes: [
        { id: 16, attributeName: 'lgot_id' },
        { id: 133, attributeName: 'lgot_start' },
        { id: 193, attributeName: 'profile_present' },
        { id: 202, attributeName: 'lgot_end' },
      ],
    },
    {
      group: 'Без полей, просто наличие',
      attributes: [
        { id: 190, attributeName: '' },
      ],
    },
    {
      group: 'Родители',
      attributes: [
        { id: 7, attributeName: 'years_14' },
        { id: 8, attributeName: 'years_13' },
        { id: 12, attributeName: 'years_11' },
        { id: 13, attributeName: 'years_10' },
        { id: 21, attributeName: 'years_8' },
        { id: 33, attributeName: 'years_15' },
        { id: 57, attributeName: 'years_7' },
        { id: 66, attributeName: 'years_5' },
        { id: 68, attributeName: 'years_16' },
        { id: 101, attributeName: 'years_17' },
        { id: 102, attributeName: 'years_4' },
        { id: 103, attributeName: 'years_3' },
        { id: 126, attributeName: 'profile_present' },
        { id: 131, attributeName: 'large_family' },
        { id: 132, attributeName: 'childs_cnt' },
        { id: 145, attributeName: 'years_2' },
        { id: 164, attributeName: 'years_1' },
        { id: 175, attributeName: 'years_9' },
        { id: 179, attributeName: 'years_0' },
        { id: 180, attributeName: 'years_6' },
        { id: 196, attributeName: 'years_12' },
      ],
    },
    {
      group: 'Возраст',
      attributes: [
        { id: 71, attributeName: 'profile_present' },
        { id: 76, attributeName: 'gender' },
        { id: 203, attributeName: 'age_group' },
      ],
    },
    {
      group: 'Регистрация в Москве',
      attributes: [
        { id: 37, attributeName: 'region_id' },
        { id: 83, attributeName: 'region_name' },
        { id: 86, attributeName: 'profile_present' },
        { id: 108, attributeName: 'okrug_id' },
        { id: 117, attributeName: 'district_id' },
        { id: 121, attributeName: 'district_name' },
        { id: 187, attributeName: 'okrug_name' },
      ],
    },
    {
      group: 'Проживание в Москве (если нет регситрации)',
      attributes: [
        { id: 9, attributeName: 'region_name' },
        { id: 59, attributeName: 'okrug_id' },
        { id: 78, attributeName: 'region_id' },
        { id: 82, attributeName: 'district_id' },
        { id: 130, attributeName: 'okrug_name' },
        { id: 148, attributeName: 'district_name' },
        { id: 152, attributeName: 'profile_present' },
      ],
    },
    {
      group: 'Наличие недвижимости в собственности',
      attributes: [
        { id: 55, attributeName: 'district_name' },
        { id: 74, attributeName: 'region_id' },
        { id: 85, attributeName: 'district_id' },
        { id: 151, attributeName: 'profile_present' },
        { id: 157, attributeName: 'okrug_name' },
        { id: 161, attributeName: 'okrug_id' },
        { id: 184, attributeName: 'region_name' },
      ],
    },
    {
      group: 'Работа',
      attributes: [
        { id: 6, attributeName: 'region_name' },
        { id: 19, attributeName: 'okrug_id' },
        { id: 31, attributeName: 'profile_present' },
        { id: 93, attributeName: 'district_id' },
        { id: 107, attributeName: 'okrug_name' },
        { id: 141, attributeName: 'region_id' },
        { id: 181, attributeName: 'district_name' },
      ],
    },
    {
      group: 'Имя',
      attributes: [
        { id: 87, attributeName: 'name' },
      ],
    },
    {
      group: 'Активный гражданин',
      attributes: [
        { id: 99, attributeName: 'profile_present' },
        { id: 114, attributeName: 'last_active' },
        { id: 195, attributeName: 'registered' },
      ],
    },
    {
      group: 'Миллион призов',
      attributes: [
        { id: 120, attributeName: 'status' },
        { id: 128, attributeName: 'issue_type' },
        { id: 143, attributeName: 'profile_present' },
      ],
    },
    {
      group: 'Любители музыки',
      attributes: [
        { id: 110, attributeName: 'info' },
      ],
    },
    {
      group: 'Культурная жизнь',
      attributes: [
        { id: 95, attributeName: 'info' },
      ],
    },
    {
      group: 'Лояльность и окрас / Скоринг',
      attributes: [
        { id: 34, attributeName: 'negative' },
        { id: 58, attributeName: 'color' },
        { id: 92, attributeName: 'profile_present' },
        { id: 186, attributeName: 'loyality' },
      ],
    },
    {
      group: 'Реновация',
      attributes: [
        { id: 50, attributeName: 'house' },
        { id: 89, attributeName: 'profile_present' },
        { id: 118, attributeName: 'owner' },
      ],
    },
  ],
};
