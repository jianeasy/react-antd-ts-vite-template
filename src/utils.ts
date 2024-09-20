export class LocalStorageManager<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  // 获取所有数据
  getAll(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // 获取单个数据
  getById(id: string): T | undefined {
    const allData = this.getAll();
    return allData.find((item: any) => item.id === id);
  }

  // 添加数据
  add(item: T): void {
    const allData = this.getAll();
    allData.push(item);
    this.saveAll(allData);
  }

  // 更新数据
  update(id: string, updatedItem: T): boolean {
    const allData = this.getAll();
    const index = allData.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      allData[index] = { ...allData[index], ...updatedItem };
      this.saveAll(allData);
      return true;
    }
    return false;
  }

  // 删除数据
  delete(id: string): boolean {
    const allData = this.getAll();
    const filteredData = allData.filter((item: any) => item.id !== id);
    if (filteredData.length !== allData.length) {
      this.saveAll(filteredData);
      return true;
    }
    return false;
  }

  // 保存所有数据
  private saveAll(data: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  // 清除所有数据
  clear(): void {
    localStorage.removeItem(this.key);
  }
}
