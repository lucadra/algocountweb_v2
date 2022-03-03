import Layout from "../components/layout/Layout";
import { CardsContainer, MaterialCard } from "../components/MaterialsComponents";
import eventsList from "../events.json";
import { Header, Intro } from "../components/typeComponents";

const Events = () => {
  return (
    <Layout>
      <Header>RECENT ACTIVITIES</Header>
      <Intro>
        The research team disseminates their findings through a variety of
        outputs directed to the general public. <br/> These are the most recent
        workshops, meetings, and events organized by the team.
      </Intro>
      <CardsContainer>
        {eventsList.map((item) => (
          <MaterialCard pageName="events" {...item} />
        ))}
      </CardsContainer>
    </Layout>
  );
};

export default Events;
