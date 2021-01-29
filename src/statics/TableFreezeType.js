/**
 * @file TableFreezeType.js
 */

/**
 * 自由冻结模式，可以选中某列向左或向右固定
 * @type {string}
 */
export const FREE_FREEZE = 'FREE_FREEZE';

/**
 * 类似于 Excel 中冻结效果的模式，选中某列冻结后，当前列及左侧的列都会向左固定
 * @type {string}
 */
export const FREEZE_LEFT = 'FREEZE_LEFT';

export default {
    FREE_FREEZE,
    FREEZE_LEFT
};
