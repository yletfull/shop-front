import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DownloadFilesForm from '@/components/segments/DownloadFilesForm';
import { useQuery } from '@/hooks';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import Modal from '@/components/Modal';
import Pagination from '@/components/PagePagination';
import { namespace as NS } from './constants';
import reducer from './reducer';
import {
  fetchSegments,
} from './actions';
import {
  getData,
  getPagination,
  getIsFetchingData,
} from './selectors';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsList = function SegmentsList({ defaultTitle }) {
  const queryParams = useMemo(() => ({
    searchId: 'id',
    searchName: 'name',
    page: 'page',
  }), []);

  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery();

  const isFetching = useSelector(getIsFetchingData);
  const tableData = useSelector(getData);
  const pagination = useSelector(getPagination);

  const isShowPagination = pagination.totalPages > 1;

  const [
    queryCurrentPage,
    setQueryCurrentPage,
  ] = useState(query.get(queryParams.page) || 1);

  const [downloadedSegment, setDownloadedSegment] = useState(null);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    dispatch(fetchSegments({
      currentPage: queryCurrentPage,
    }));
  }, [dispatch, queryCurrentPage]);

  const handleChangePage = (page) => {
    setQueryCurrentPage(page);
    query.set(queryParams.page, String(page));
    history.push({ search: query.toString() });
  };
  const handleClickDownload = ({ id, title, type }) => {
    if (!id || !type) {
      return;
    }
    setDownloadedSegment({ id, type, title });
  };
  const handleCloseDownloadForm = () => {
    setDownloadedSegment(null);
  };
  const handleSubmitDownloadForm = async (values) => {
    const {
      id,
      sources,
      count: splitFilesCount,
      name: fileName,
      samples: sampleRowsSize,
    } = values;
    const {
      type: adsPlatform,
    } = downloadedSegment;

    if (!id || !fileName || !sources || !Array.isArray(sources)) {
      return;
    }

    const params = {
      adsPlatform,
      fileName,
      sampleRowsSize,
      splitFilesCount,
      entityTypes: sources.join(),
    };

    try {
      const response = await service.downloadSegmentFile(id, params);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitTableFilterForm = ({ searchId, searchName }) => {
    query.set(queryParams.searchId, String(searchId));
    query.set(queryParams.searchName, String(searchName));
    history.push({ search: query.toString() });
  };

  return (
    <div className={styles.segmentsList}>
      <Controls>
        <ControlsLink
          icon={(<IconPlus />)}
          to="/segments/edit"
        >
          Новый
          <br />
          сегмент
        </ControlsLink>
        <ControlsLink
          icon={(<IconSearch />)}
          to="/"
        >
          Найти
          <br />
          пользователя
        </ControlsLink>
      </Controls>

      <TableView
        isFetching={isFetching}
        queryParams={queryParams}
        data={tableData}
        onClickDownload={handleClickDownload}
        onSubmitFilter={handleSubmitTableFilterForm}
      />

      {!isShowPagination && (
        <Pagination
          page={pagination.currentPage}
          numberOfPages={pagination.totalPages + 1}
          numberOfVisiblePages={Math.min(5, pagination.totalPages + 1)}
          isDisabled={isFetching}
          onChangePage={handleChangePage}
        />
      )}

      <Modal
        header={(
          <span>
            Сохранение файлов для
            {' '}
            {downloadedSegment?.type.toUpperCase() || ''}
          </span>
        )}
        isVisible={Boolean(downloadedSegment)}
        onClose={handleCloseDownloadForm}
      >
        <DownloadFilesForm
          id={downloadedSegment?.id}
          name={downloadedSegment?.name}
          onClose={handleCloseDownloadForm}
          onSubmit={handleSubmitDownloadForm}
        />
      </Modal>
    </div>
  );
};

SegmentsList.propTypes = propTypes;
SegmentsList.defaultProps = defaultProps;

export default SegmentsList;
