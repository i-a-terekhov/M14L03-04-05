import {OrderStatusUtil} from "./order-status.util";

describe('order status util', () => {
console.log('начало')

  it('should return name and color with no status', () => {
    const result = OrderStatusUtil.getStatusAndColor(null);

    expect(result.name).not.toBe('');
    expect(result.color).not.toBe('');
  });





})
