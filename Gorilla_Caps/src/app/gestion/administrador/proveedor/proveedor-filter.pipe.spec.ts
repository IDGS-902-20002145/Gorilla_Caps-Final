import { ProveedoresFilterPipe } from "./proveedor-filter.pipe";

describe(' ProveedoresFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new  ProveedoresFilterPipe();
    expect(pipe).toBeTruthy();
  });
});