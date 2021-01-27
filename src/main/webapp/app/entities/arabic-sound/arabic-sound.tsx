import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './arabic-sound.reducer';
import { IArabicSound } from 'app/shared/model/arabic-sound.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArabicSoundProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ArabicSound = (props: IArabicSoundProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { arabicSoundList, match, loading } = props;
  return (
    <div>
      <h2 id="arabic-sound-heading">
        Arabic Sounds
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Arabic Sound
        </Link>
      </h2>
      <div className="table-responsive">
        {arabicSoundList && arabicSoundList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Word</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {arabicSoundList.map((arabicSound, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${arabicSound.id}`} color="link" size="sm">
                      {arabicSound.id}
                    </Button>
                  </td>
                  <td>{arabicSound.name}</td>
                  <td>{arabicSound.description}</td>
                  <td>
                    {arabicSound.words
                      ? arabicSound.words.map((val, j) => (
                          <span key={j}>
                            <Link to={`word/${val.id}`}>{val.id}</Link>
                            {j === arabicSound.words.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${arabicSound.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${arabicSound.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${arabicSound.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Arabic Sounds found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ arabicSound }: IRootState) => ({
  arabicSoundList: arabicSound.entities,
  loading: arabicSound.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArabicSound);
