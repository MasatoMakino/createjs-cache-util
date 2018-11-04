import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;
import Rectangle = createjs.Rectangle;

export class CreatejsCacheUtil {
  /**
   * フィルタ適用のためのキャッシュを生成する。
   * @param {createjs.DisplayObject} target
   * @param {createjs.Filter[]} filters
   * @param {number} margin
   */
  public static setFilter(
    target: DisplayObject,
    filters: createjs.Filter[],
    margin: number = 8
  ): void {
    target.filters = filters;

    if (!target.cacheCanvas) {
      const bounds = target.getBounds();
      this.cacheWithMargin(target, bounds, margin);
    } else {
      target.updateCache();
    }
  }

  /**
   * テキストオブジェクトのキャッシュと更新を行う。
   * テキストに変化がない場合は処理をスキップする。
   * @param {createjs.Text} target
   * @param {string} value
   * @param option オプション　marginはテキスト周囲のキャッシュのマージンサイズ colorはテキスト色
   */
  public static cacheText(
    target: createjs.Text,
    value: string,
    option?: CacheTextOption
  ): void {
    if (!target) return;

    option = CacheTextOption.init(target, option);
    if (!this.isNeedUpdate(target, value, option)) return;

    //文字とカラーの更新
    target.text = value;
    target.color = option.color;

    //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了
    if (target.cacheCanvas && target.text === value) {
      target.updateCache();
      return;
    }

    //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。
    //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。
    target.uncache();
    const bounds = target.getBounds();

    //空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。
    if (bounds == null) return;

    this.cacheWithMargin(target, bounds, option.margin);
  }

  /**
   * 対象のディスプレイオブジェクトを、指定されたバウンディングボックスの範囲でキャッシュする。
   * @param {createjs.DisplayObject} target
   * @param {createjs.Rectangle} bounds
   * @param {number} margin
   */
  private static cacheWithMargin(
    target: DisplayObject,
    bounds: Rectangle,
    margin: number
  ): void {
    target.cache(
      bounds.x - margin,
      bounds.y - margin,
      bounds.width + margin * 2,
      bounds.height + margin * 2
    );
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
  private static isNeedUpdate(
    target: Text,
    value: string,
    option: CacheTextOption
  ): boolean {
    //キャッシュが行われていないなら強制的にキャッシュを更新。
    if (!target.cacheCanvas) return true;

    //状態が同一か確認
    if (target.text !== value) return true;
    if (target.color !== option.color) return true;
    return false;
  }
}

/**
 * CreatejsCacheUtil.cacheText関数のためのオプション。
 */
export class CacheTextOption {
  margin?: number;
  color?: string;

  /**
   * 不足している値をデフォルト値で埋める。
   * @param {createjs.Text} target
   * @param {CacheTextOption} option
   * @returns {CacheTextOption}
   */
  public static init(target: Text, option?: CacheTextOption): CacheTextOption {
    if (option == null) option = {};
    if (option.margin == null) option.margin = 8;
    if (!option.color) option.color = target.color;

    return option;
  }
}
