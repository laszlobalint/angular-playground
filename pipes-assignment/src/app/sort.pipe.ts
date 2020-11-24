import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: string[], args?: any): string[] {
    if (value && value.length > 0) {
      return value.sort((a, b) => a[args].localeCompare(b[args]));
    }
    return value;
  }
}
