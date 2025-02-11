<?php
class Table_view {
  private array $event_array; 
  private string $tableLogType; 
  function __construct(array $event_array, string $type) {
    $this->event_array = $event_array;
    $this->tableLogType = $type;
  }

  function createTable() {
    $type = $this->tableLogType;
    try {
        $htmlstring = "<table class='$type-table-container' style='
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        font-family: Arial, sans-serif;
        text-align: left;
    >";
        foreach($this->event_array as $index=>$value) {
          if ($index === 0) {
            $htmlstring .= "<tr style='background-color: #f2f2f2;'>";
            for ($I=0;$I<3;$I++) {
              $htmlstring .= "<th style='
                    background-color: #90EE90;
                    border: 1px solid #ddd;
                    padding: 10px;
                    font-weight: bold;
                '>".$value[$I]."</th>";
            }
            $htmlstring .= "</tr>";
          } else {
            $htmlstring .= "<tr>";
            for ($I=0;$I<3;$I++) {
              $htmlstring .= "<td style='
                    border: 1px solid #ddd;
                    padding: 8px;
                '>".$value[$I]."</td>";
            }
            $htmlstring .= "</tr>";
          }
        }
        $htmlstring .= "</table>";
        
        return $htmlstring;
    } catch (Exception $e) {
      require_once(__DIR__ ."//..//models//logs.model.php");
      $exception = new Logs_model($e->getMessage(), 'exception');
      $exception->logException();
      return $exception;
      unset($exception);
    }
  }
}