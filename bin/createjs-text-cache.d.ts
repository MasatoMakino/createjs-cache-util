/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
export declare class CreatejsCacheUtil {
  /**
   * フィルタ適用のためのキャッシュを生成する。
   * @param {createjs.DisplayObject} target
   * @param {createjs.Filter[]} filters
   * @param {number} margin
   */
  static setFilter(
    target: DisplayObject,
    filters: createjs.Filter[],
    margin?: number
  ): void;
  /**
   * テキストオブジェクトのキャッシュと更新を行う。
   * テキストに変化がない場合は処理をスキップする。
   * @param {createjs.Text} target
   * @param {string} value
   * @param option オプション　marginはテキスト周囲のキャッシュのマージンサイズ colorはテキスト色
   */
  static cacheText(
    target: createjs.Text,
    value: string,
    option?: {
      margin?: number;
      color?: string;
    }
  ): boolean;
}
//# sourceMappingURL=createjs-text-cache.d.ts.map
