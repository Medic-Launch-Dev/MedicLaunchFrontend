import { observer } from "mobx-react-lite";
import Page from "../components/nav/Page";
import UserProfile from "../components/profile/UserProfile";

function MyProfile() {
  return (
    <Page withNav>
      <UserProfile />
    </Page>
  )
}

export default observer(MyProfile);