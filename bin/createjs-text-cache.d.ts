/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;
export declare class CreatejsCacheUtil {
    /**
     * フィルタ適用のためのキャッシュを生成する。
     * @param {createjs.DisplayObject} target
     * @param {createjs.Filter[]} filters
     * @param {number} margin
     */
    static setFilter(target: DisplayObject, filters: createjs.Filter[], margin?: number): void;
    /**
     * テキストオブジェクトのキャッシュと更新を行う。
     * テキストに変化がない場合は処理をスキップする。
     * @param {createjs.Text} target
     * @param {string} value
     * @param option オプション　marginはテキスト周囲のキャッシュのマージンサイズ colorはテキスト色
     */
    static cacheText(target: createjs.Text, value: string, option?: CacheTextOption): void;
    /**
     * 対象のディスプレイオブジェクトを、指定されたマージンの範囲でキャッシュする。
     * キャッシュはupdateではなくuncacheを行い、キャッシュサイズも変更する。
     *
     * @param {createjs.DisplayObject} target
     * @param {number} margin
     */
    private static refreshCache;
    /**
     * キャッシュの更新が必要か否かを判定する。
     * cacheText関数の内部処理。
     *
     * @param {createjs.Text} target
     * @param {string} value
     * @param {CacheTextOption} option
     * @returns {boolean}
     */
    private static isNeedUpdate;
}
/**
 * CreatejsCacheUtil.cacheText関数のためのオプション。
 */
export declare class CacheTextOption {
    margin?: number;
    color?: string;
    /**
     * 不足している値をデフォルト値で埋める。
     * @param {createjs.Text} target
     * @param {CacheTextOption} option
     * @returns {CacheTextOption}
     */
    static init(target: Text, option?: CacheTextOption): CacheTextOption;
}
//# sourceMappingURL=createjs-text-cache.d.ts.map