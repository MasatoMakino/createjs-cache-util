export class CreatejsCacheUtil {
    /**
     * フィルタ適用のためのキャッシュを生成する。
     * @param {createjs.DisplayObject} target
     * @param {createjs.Filter[]} filters
     * @param {number} margin
     * @param {number} scale
     */
    static setFilter(target, filters, margin = 8, scale = 1) {
        target.filters = filters;
        if (!target.bitmapCache) {
            this.refreshCache(target, margin, scale);
        }
        else {
            target.updateCache();
        }
    }
    /**
     * テキストオブジェクトのキャッシュと更新を行う。
     * テキストに変化がない場合は処理をスキップする。
     * @param {createjs.Text} target
     * @param {string} value
     * @param {CacheTextOption} option
     */
    static cacheText(target, value, option) {
        if (!target)
            return;
        option = CacheTextOption.init(target, option);
        if (!this.isNeedUpdate(target, value, option))
            return;
        //文字とカラーの更新
        const currentText = target.text;
        target.text = value;
        target.color = option.color;
        //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了
        if (target.bitmapCache && currentText === value) {
            target.updateCache();
            return;
        }
        this.refreshCache(target, option.margin, option.scale);
    }
    /**
     * 対象のディスプレイオブジェクトを、指定されたマージンの範囲でキャッシュする。
     * キャッシュはupdateではなくuncacheを行い、キャッシュサイズも変更する。
     *
     * @param {createjs.DisplayObject} target
     * @param {number} margin
     * @param {number} scale
     */
    static refreshCache(target, margin, scale) {
        //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。
        //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。
        target.uncache();
        const rect = this.getRect(target, margin);
        //targetが空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。
        if (rect == null)
            return;
        target.cache(rect.x, rect.y, rect.width, rect.height, scale);
    }
    /**
     * キャッシュ用の座標を取得。
     * @param target
     * @param margin
     */
    static getRect(target, margin) {
        const bounds = target.getBounds();
        if (bounds == null)
            return null;
        return {
            x: bounds.x - margin,
            y: bounds.y - margin,
            width: bounds.width + margin * 2,
            height: bounds.height + margin * 2
        };
    }
    /**
     * キャッシュの更新が必要か否かを判定する。
     * cacheText関数の内部処理。
     *
     * @param {createjs.Text} target
     * @param {string} value
     * @param {CacheTextOption} option
     * @returns {boolean}
     */
    static isNeedUpdate(target, value, option) {
        //キャッシュが行われていないなら強制的にキャッシュを更新。
        if (!target.bitmapCache)
            return true;
        //状態が同一か確認
        if (target.text !== value)
            return true;
        if (target.color !== option.color)
            return true;
        //スケール値が存在し、かつ同一かを確認
        const cacheScale = target.bitmapCache.scale; //2019/05/03 bitmapCache.scaleプロパティは非公開である。将来的に取得できなくなる可能性がある。
        if (cacheScale != null && cacheScale !== option.scale)
            return true;
        return false;
    }
}
/**
 * CreatejsCacheUtil.cacheText関数のためのオプション。
 */
export class CacheTextOption {
    /**
     * 不足している値をデフォルト値で埋める。
     * @param {createjs.Text} target
     * @param {CacheTextOption} option
     * @returns {CacheTextOption}
     */
    static init(target, option) {
        if (option == null)
            option = {};
        if (option.margin == null)
            option.margin = 8;
        if (!option.color)
            option.color = target.color;
        if (option.scale == null)
            option.scale = 1;
        return option;
    }
}
