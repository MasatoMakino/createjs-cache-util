import DisplayObject = createjs.DisplayObject;

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
      target.cache(
        bounds.x - margin,
        bounds.y - margin,
        bounds.width + margin * 2,
        bounds.height + margin * 2
      );
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
    option?: {
      margin?: number;
      color?: string;
    }
  ): boolean {
    if (!target) return false;

    //optionのデフォルト値を追加。
    if (!option) {
      option = {};
    }
    if (!option.margin) {
      option.margin = 8;
    }
    if (!option.color) {
      option.color = target.color;
    }

    //状態が同一か確認
    let isSame: boolean = true;
    const isSameString: boolean = target.text === value;
    if (!isSameString) isSame = false;
    if (target.color !== option.color) {
      isSame = false;
    }
    if (isSame) {
      //状態が全く同じなら更新をせずに終了
      return false;
    }

    //文字とカラーの更新
    target.text = value;
    if (target.color !== option.color) {
      target.color = option.color;
    }

    //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了
    if (target.cacheCanvas && isSameString) {
      target.updateCache();
      return true;
    }

    //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。
    //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。
    target.uncache();
    const bounds = target.getBounds();

    //空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。
    if (bounds === null || bounds === undefined) {
      if (target.cacheCanvas) {
        target.uncache();
      }
      return false;
    }

    //文言が異なる場合は再キャッシュ。
    target.cache(
      bounds.x - option.margin,
      bounds.y - option.margin,
      bounds.width + option.margin * 2,
      bounds.height + option.margin * 2
    );
    return true;
  }
}
