import { Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import PageWithNav from "../components/nav/PageWithNav";
import UserProfile from "../components/profile/UserProfile";

function MyProfile() {
  return (
    <PageWithNav>
      <Container maxWidth="lg">
        <UserProfile />
      </Container>
    </PageWithNav>
  )
}

export default observer(MyProfile);