import styled from "styled-components";

export const TeamContainer = styled.div`
  border: 1px dashed #ccc;
  padding: 0.5rem;
  margin: 0.5rem;
  min-width: 250px;
  min-height: 400px;
  background: #f8f9fa;
`;

export const PersonItem = styled.div`
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid #dee2e6;
  cursor: move;
  transition: background 0.2s ease;

  &:hover {
    background: #e9ecef;
  }
`;

export const AverageDisplay = styled.div`
  font-weight: bold;
  color: #2b8a3e;
  margin-top: 1rem;
`;
