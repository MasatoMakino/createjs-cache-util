/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;
export declare class CreatejsCacheUtil {
    /**
     * フィルタ適用のためのキャッシュを生成する。
     * @param target
     * @param filters
     * @param margin
     * @param scale
     * @param addHitArea
     */
    static setFilter(target: DisplayObject, filters: createjs.Filter[], margin?: number, scale?: number, addHitArea?: boolean): void;
    /**
     * テキストオブジェクトのキャッシュと更新を行う。
     * テキストに変化がない場合は処理をスキップする。
     * @param {createjs.Text} target
     * @param {string} value
     * @param {CacheTextOption} option
     */
    static cacheText(target: createjs.Text, value: string, option?: CacheTextOption): void;
    /**
     * 対象のディスプレイオブジェクトを、指定されたマージンの範囲でキャッシュする。
     * キャッシュはupdateではなくuncacheを行い、キャッシュサイズも変更する。
     *
     * @param target
     * @param margin
     * @param scale
     * @param addHitArea
     */
    private static refreshCache;
    /**
     * キャッシュ用の座標を取得。
     * @param target
     * @param margin
     */
    private static getRect;
    private static addHitArea;
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
    /**
     * キャッシュの上下左右のマージン。単位ピクセル。既定値8。
     */
    margin?: number;
    /**
     * テキストカラー。既定値はテキストオブジェクトのカラーを引き継ぐ。
     */
    color?: string;
    /**
     * キャッシュのスケール。指定された倍率のビットマップキャッシュが生成される。既定値1。
     */
    scale?: number;
    /**
     * ヒット領域を追加するか否か。既定値false
     */
    addHitArea?: boolean;
    /**
     * 不足している値をデフォルト値で埋める。
     * @param {createjs.Text} target
     * @param {CacheTextOption} option
     * @returns {CacheTextOption}
     */
    static init(target: Text, option?: CacheTextOption): CacheTextOption;
}
//# sourceMappingURL=createjs-text-cache.d.ts.map