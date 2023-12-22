import { ListPageLayout } from "./styles";
import { ItemList } from "./_componets/list";

export default function List() {
  return (
    <ListPageLayout>
      <div>menu</div>
      <ItemList />
    </ListPageLayout>
  );
}
