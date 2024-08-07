import {
  IconClock16,
  IconDimensionData16,
  IconDimensionOrgUnit16,
} from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import React from 'react';
import { AssignedCategoriesIcon } from '../assets/AssignedCategoriesIcon';

export const DIMENSION_ID_DATA = 'dx';
export const DIMENSION_ID_PERIOD = 'pe';
export const DIMENSION_ID_ORGUNIT = 'ou';
export const DIMENSION_ID_ORGUNIT_LEVEL = 'ouLevel';
export const DIMENSION_ID_ORGUNIT_GROUP = 'ouGroup';
export const DIMENSION_ID_ASSIGNED_CATEGORIES = 'co';
export const DIMENSION_PROP_NO_ITEMS = 'noItems';

export const getFixedDimensions = () => ({
  [DIMENSION_ID_DATA]: {
    id: DIMENSION_ID_DATA,
    name: i18n.t('Data'),
    iconName: 'DataIcon',
    icon: IconDimensionData16,
  },
  [DIMENSION_ID_PERIOD]: {
    id: DIMENSION_ID_PERIOD,
    name: i18n.t('Period'),
    iconName: 'PeriodIcon',
    icon: IconClock16,
  },
  [DIMENSION_ID_ORGUNIT]: {
    id: DIMENSION_ID_ORGUNIT,
    name: i18n.t('Organisation unit'),
    iconName: 'OrgUnitIcon',
    icon: IconDimensionOrgUnit16,
  },
});

export const getDynamicDimensions = () => ({
  [DIMENSION_ID_ASSIGNED_CATEGORIES]: {
    id: DIMENSION_ID_ASSIGNED_CATEGORIES,
    name: i18n.t('Assigned Categories'),
    iconName: 'AssignedCategoriesIcon',
    icon: AssignedCategoriesIcon,
    [DIMENSION_PROP_NO_ITEMS]: true,
  },
});

export const getPredefinedDimensions = () => ({
  ...getFixedDimensions(),
  ...getDynamicDimensions(),
});

export const filterOutPredefinedDimensions = (dimensionIds: string[]) =>
  dimensionIds.filter(
    (dimensionId: string) =>
      !Object.keys(getPredefinedDimensions()).includes(dimensionId)
  );

export const getPredefinedDimensionProp = (
  dimensionId: string,
  propName: string
) => ((getPredefinedDimensions() as any)[dimensionId] || {})[propName];

export const getDimensionById = (dimensionId: string) =>
  (getPredefinedDimensions() as any)[dimensionId];
