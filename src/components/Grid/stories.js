import React from 'react';
import GridCell from './Cell';
import Grid from './index';

export default {
  title: 'components/Grid',
  component: Grid,
};

const Card = ({ children }) => (
  <div style={{ backgroundColor: 'lightgray', height: '100%', width: '100%' }}>
    {children}
  </div>
);


export const Index = () => (
  <Grid>
    <GridCell
      columns={12}
      rows={23}
    >
      <Card>
        1
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={12}
    >
      <Card>
        2
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={12}
    >
      <Card>
        3
      </Card>
    </GridCell>
    <GridCell
      columns={4}
      rows={20}
    >
      <Grid inset>
        <GridCell rows={10}>
          <Card>
            4
          </Card>
        </GridCell>
        <GridCell rows={9}>
          <Card>
            5
          </Card>
        </GridCell>
      </Grid>
    </GridCell>
    <GridCell
      columns={4}
      rows={20}
    >
      <Card>
        6
      </Card>
    </GridCell>
    <GridCell
      columns={4}
      rows={20}
    >
      <Grid inset>
        <GridCell rows={10}>
          <Card>
            7
          </Card>
        </GridCell>
        <GridCell rows={9}>
          <Card>
            8
          </Card>
        </GridCell>
      </Grid>
    </GridCell>
    <GridCell
      columns={3}
      rows={12}
    >
      <Card>
        9
      </Card>
    </GridCell>
    <GridCell
      columns={3}
      rows={12}
    >
      <Card>
        10
      </Card>
    </GridCell>
    <GridCell
      columns={3}
      rows={12}
    >
      <Card>
        11
      </Card>
    </GridCell>
    <GridCell
      columns={3}
      rows={12}
    >
      <Card>
        12
      </Card>
    </GridCell>
  </Grid>
);

export const Analytics = () => (
  <Grid>
    <GridCell
      columns={12}
      rows={21}
    >
      <Card>
        <b>
          Динамика инфоповодов редакции
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={12}
      rows={25}
    >
      <Card>
        <b>
          Инфоповоды по сферам
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={12}
      rows={13}
    >
      <Card>
        <b>
          Тональность
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={23}
    >
      <Card>
        <b>
          Все лидеры роста
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={23}
    >
      <Card>
        <b>
          Лидеры роста в своих сферах
        </b>
      </Card>
    </GridCell>
  </Grid>
);

export const AnalyticsSphere = () => (
  <Grid>
    <GridCell
      columns={12}
      rows={21}
    >
      <Card>
        <b>
          Динамика инфоповодов редакции в сфере ЖКХ
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={12}
      rows={7}
    >
      <Card>
        {' '}
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={22}
    >
      <Card>
        <b>
          Топ инфоповодов в сфере ЖКХ
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={22}
    >
      <Card>
        <b>
          Пересечения инфоповодов ЖКХ с другими сферами
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={12}
      rows={13}
    >
      <Card>
        <b>
          Тональность в сфере ЖКХ
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={23}
    >
      <Card>
        <b>
          Все лидеры роста
        </b>
      </Card>
    </GridCell>
    <GridCell
      columns={6}
      rows={23}
    >
      <Card>
        <b>
          Лидеры роста в сфере ЖКХ
        </b>
      </Card>
    </GridCell>
  </Grid>
);
