import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './arabic-sound.reducer';
import { IArabicSound } from 'app/shared/model/arabic-sound.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArabicSoundDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArabicSoundDetail = (props: IArabicSoundDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { arabicSoundEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ArabicSound [<b>{arabicSoundEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{arabicSoundEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{arabicSoundEntity.description}</dd>
          <dt>Word</dt>
          <dd>
            {arabicSoundEntity.words
              ? arabicSoundEntity.words.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === arabicSoundEntity.words.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/arabic-sound" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/arabic-sound/${arabicSoundEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ arabicSound }: IRootState) => ({
  arabicSoundEntity: arabicSound.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArabicSoundDetail);
